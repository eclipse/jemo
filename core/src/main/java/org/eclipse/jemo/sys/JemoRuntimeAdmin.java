/*
 ********************************************************************************
 * Copyright (c) 9th November 2018 Cloudreach Limited Europe
 *
 * This program and the accompanying materials are made available under the
 * terms of the Eclipse Public License 2.0 which is available at
 * http://www.eclipse.org/legal/epl-2.0.
 *
 * This Source Code may also be made available under the following Secondary
 * Licenses when the conditions for such availability set forth in the Eclipse
 * Public License, v. 2.0 are satisfied: GNU General Public License, version 2
 * with the GNU Classpath Exception which is
 * available at https://www.gnu.org/software/classpath/license.html.
 *
 * SPDX-License-Identifier: EPL-2.0 OR GPL-2.0 WITH Classpath-exception-2.0
 ********************************************************************************/
package org.eclipse.jemo.sys;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import org.eclipse.jemo.Jemo;
import org.eclipse.jemo.internal.model.*;
import org.eclipse.jemo.sys.JemoPluginManager.PluginManagerModule;
import org.eclipse.jemo.sys.auth.JemoUser;
import org.eclipse.jemo.sys.internal.SystemDB;
import org.eclipse.jemo.sys.internal.Util;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.*;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.*;
import java.util.logging.Level;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import static java.util.stream.Collectors.toList;
import static org.eclipse.jemo.sys.JemoPluginManager.*;
import static org.eclipse.jemo.sys.JemoPluginManager.PluginManagerModule.respondWithJson;
import static org.eclipse.jemo.sys.internal.Util.*;

public class JemoRuntimeAdmin {

    static final String JEMO_ADMIN = "/jemo/admin";
    static final String JEMO_PLUGINS = JEMO_ADMIN + "/plugins";
    private static final String JEMO_CICD = JEMO_ADMIN + "/cicd";
    private static final String JEMO_CICD_RESULT = JEMO_ADMIN + "/cicd/result";
    private static final String JEMO_ADMIN_AUTH = JEMO_ADMIN + "/auth";
    private static final Pattern PLUGIN_VERSION_PATTERN = Pattern.compile(JEMO_PLUGINS + "/(\\d+)/(.*)");
    private static final Pattern DEPLOYMENT_LOG_TIMESTAMP_PATTERN = Pattern.compile("Finished at: (.*)");
    private static final Pattern DEPLOYMENT_LOG_NAME_VERSION_PATTERN = Pattern.compile("\\{(.*)-([0-9]+\\.[0-9]+)-jar-with-dependencies.jar\\} to environment: (.*) (.*)");
    private static final Pattern DEPLOYMENT_LOG_VERSION_PATTERN = Pattern.compile("Building (.*) ([0-9]+\\.[0-9]+)");
    static final String DEPLOYMENT_HISTORY_TABLE = "eclipse_jemo_deployment_history";

    public static void processRequest(PluginManagerModule pluginManagerModule, JemoUser authUser, HttpServletRequest request, HttpServletResponse response) throws Throwable {
        switch (request.getMethod()) {
            case "GET":
                if (JEMO_PLUGINS.equals(request.getRequestURI())) {
                    if (!authorise(authUser, response)) {
                        return;
                    }
                    getUploadedApps(response);
                } else if (request.getRequestURI().startsWith(JEMO_CICD_RESULT)) {
                    getDeploymentHistory(response);
                } else {
                    loadFile(request.getRequestURI().replaceAll(JEMO_ADMIN, ""), response);
                }
                break;
            case "POST":
                if (!authorise(authUser, response)) {
                    return;
                }
                switch (request.getRequestURI()) {
                    case JEMO_ADMIN_AUTH:
                        // This method is called only after the user is authorised
                        respondWithJson(201, response, null);
                        break;
                    case JEMO_CICD:
                        deployFromGit(request, response);
                        break;
                    default:
                        response.sendError(404, "No functionality is mapped to this endpoint yet" + request.getRequestURI());
                }
                break;
            case "OPTIONS":
                response.addHeader("Access-Control-Allow-Origin", "*");
                response.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,PATCH,DELETE");
                response.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Authorization, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
                break;
            case "DELETE":
                if (!authorise(authUser, response)) {
                    return;
                }
                Matcher matcher;
                if ((matcher = PLUGIN_VERSION_PATTERN.matcher(request.getRequestURI())).find()) {
                    deletePluginVersion(pluginManagerModule, authUser, Integer.parseInt(matcher.group(1)), matcher.group(2), response);
                } else {
                    response.sendError(400);
                }
                break;
            case "PUT":
                if (!authorise(authUser, response)) {
                    return;
                }
                response.sendError(404, "No functionality is mapped to this endpoint yet" + request.getRequestURI());
                break;
            case "PATCH":
                if (!authorise(authUser, response)) {
                    return;
                }
                if ((matcher = PLUGIN_VERSION_PATTERN.matcher(request.getRequestURI())).find()) {
                    changeState(pluginManagerModule, authUser, Integer.parseInt(matcher.group(1)), matcher.group(2), request, response);
                }
                response.sendError(404, "No functionality is mapped to this endpoint yet" + request.getRequestURI());
                break;
            default:
                response.sendError(400);
        }
    }

    private static boolean authorise(JemoUser authUser, HttpServletResponse response) throws IOException {
        if (authUser.isAdmin()) {
            return true;
        } else {
            respondWithJson(401, response, "The user: " + authUser.getUsername() + "does not have admin permissions.");
            return false;
        }
    }

    private static void getUploadedApps(HttpServletResponse response) throws IOException {
        final List<Plugin> plugins = readAppMetadataFromDB().stream()
                .map(Plugin::new)
                .sorted()
                .collect(toList());
        respondWithJson(200, response, plugins);
    }

    private static void deletePluginVersion(PluginManagerModule pluginManagerModule, JemoUser authUser, int pluginId, String version, HttpServletResponse response) throws Throwable {
        final boolean isDeleted = pluginManagerModule.deletePlugin(pluginId, Double.parseDouble(version), authUser);
        final int statusCode = isDeleted ? 204 : 404;
        respondWithJson(statusCode, response, null);
    }

    private static void changeState(PluginManagerModule pluginManagerModule, JemoUser authUser, int pluginId, String version, HttpServletRequest request, HttpServletResponse response) throws Throwable {
        final JemoApplicationMetaData newPartialState = Jemo.fromJSONString(JemoApplicationMetaData.class, Util.toString(request.getInputStream()));
        final double versionAsDouble = Double.parseDouble(version);
        Optional<JemoApplicationMetaData> appMetaData = readAppMetadataFromDB().stream()
                .filter(app -> PLUGIN_ID(app.getId()) == pluginId && PLUGIN_VERSION(app.getId()) == versionAsDouble)
                .findFirst();

        if (!appMetaData.isPresent()) {
            respondWithJson(404, response, null);
        } else {
            if (appMetaData.get().isEnabled() != newPartialState.isEnabled()) {
                pluginManagerModule.changeState(appMetaData.get(), authUser);
                final JemoApplicationMetaData newMetaData = readAppMetadataFromDB().stream()
                        .filter(app -> PLUGIN_ID(app.getId()) == pluginId && PLUGIN_VERSION(app.getId()) == versionAsDouble)
                        .findFirst().get();

                respondWithJson(200, response, new Plugin(newMetaData));
            } else {
                respondWithJson(204, response, null);
            }
        }
    }

    /**
     * Forwards to plugins/index.html
     *
     * @param requestUri
     * @param response   the http servlet response object
     * @throws IOException
     */
    private static void loadFile(String requestUri, HttpServletResponse response) throws IOException {
        final String fileName = requestUri.isEmpty() || requestUri.equals("/") ? "/index.html" : requestUri;
        final InputStream in = Jemo.class.getResourceAsStream("/ui/admin" + fileName);
        Jemo.stream(response.getOutputStream(), new ByteArrayInputStream(readAllBytes(in)));
    }

    private static void deployFromGit(HttpServletRequest request, HttpServletResponse response) throws IOException {
        final DeployResource deployResource = Jemo.fromJSONString(DeployResource.class, Util.toString(request.getInputStream()));

        if (!hasMandatoryField(response, deployResource, "repoUrl", deployResource.repoUrl)) return;
        if (!hasMandatoryField(response, deployResource, "pluginId", deployResource.pluginId)) return;

        final String authHeader = request.getHeader("Authorization");
        final String[] credentials = new String(Base64.getDecoder().decode(authHeader.split(" ")[1]), "UTF-8").split(":");

        try {
            deployResource.jemoUrl = request.getRequestURL().substring(0, request.getRequestURL().indexOf("/jemo"));
        } catch (Exception e) {
            e.printStackTrace();
        }

        final Path cicdDirPath = Paths.get("cicd/" + deployResource.pluginId);
        Util.deleteDirectory(cicdDirPath.toFile());
        Files.createDirectories(cicdDirPath);

        final String branch = isNullOrEmpty(deployResource.branch) ? "master" : deployResource.branch;
        final String subDir = isNullOrEmpty(deployResource.subDir) ? "" : "/" + deployResource.subDir;

        final String skipTests = deployResource.skipTests ? "-DskipTests" : "";
        final String[] results = runProcess(null, new String[]{
                "/bin/sh", "-c", "git clone --single-branch --branch " + branch + " " + deployResource.repoUrl + " " + cicdDirPath.toString() + " ; " +
                "mvn deploy -f " + cicdDirPath.toString() + subDir + "/pom.xml " + skipTests + " -Djemo.username=" + credentials[0] +
                " -Djemo.password=" + credentials[1] + " -Djemo.id=" + deployResource.pluginId + " -Djemo.endpoint=" + deployResource.jemoUrl
        });

        deployResource.logs = results[0];
        SystemDB.createTable(DEPLOYMENT_HISTORY_TABLE);
        SystemDB.save(DEPLOYMENT_HISTORY_TABLE, deployResource.resolve());
        Util.deleteDirectory(cicdDirPath.toFile());

        respondWithJson(201, response, deployResource);
    }

    private static void getDeploymentHistory(HttpServletResponse response) throws IOException {
        List<DeployResource> deployResources;
        try {
            deployResources = SystemDB.list(DEPLOYMENT_HISTORY_TABLE, DeployResource.class).stream()
                    .sorted(Comparator.comparing((DeployResource r) -> r.timestamp).reversed())
                    .collect(toList());
            respondWithJson(200, response, deployResources);
        } catch (Exception e) {
            final String message = "Failed to fetch the deployment history: " + e.getMessage();
            log(Level.SEVERE, message);
            respondWithJson(400, response, message);
        }
    }

    private static boolean hasMandatoryField(HttpServletResponse response, DeployResource deployResource, String field, String value) throws IOException {
        if (isNullOrEmpty(value)) {
            deployResource.msg = "Field " + field + " is mandatory";
            respondWithJson(400, response, deployResource);
            return false;
        }
        return true;
    }

    private static boolean isNullOrEmpty(String s) {
        return s == null || s.isEmpty();
    }

    public static class Plugin implements Comparable {

        @JsonProperty
        private PluginInfo pluginInfo;

        @JsonProperty
        private JemoApplicationMetaData metaData;

        public Plugin() {
        }

        public Plugin(JemoApplicationMetaData metaData) {
            this.pluginInfo = new PluginInfo(metaData.getId());
            this.metaData = metaData;
        }

        @Override
        public int compareTo(Object o) {
            Plugin that = (Plugin) o;
            return this.pluginInfo.compareTo(that.pluginInfo);
        }

        public static class PluginInfo implements Comparable {

            @JsonProperty
            private int id;

            @JsonProperty
            private String name;

            @JsonProperty
            private String version;


            public PluginInfo() {
            }

            public PluginInfo(String pluginJarFileName) {
                this.id = PLUGIN_ID(pluginJarFileName);
                this.name = PLUGIN_NAME(pluginJarFileName);
                this.version = String.valueOf(PLUGIN_VERSION(pluginJarFileName));
            }

            @Override
            public int compareTo(Object o) {
                PluginInfo that = (PluginInfo) o;
                if (this.id != that.id) {
                    return this.id - that.id;
                } else {
                    return this.version.compareTo(that.version);
                }
            }
        }
    }

    public static class DeployResource implements SystemDBObject {

        @JsonIgnore
        private String jemoUrl;

        @JsonProperty
        private boolean success;

        @JsonProperty
        private String service, repoUrl, branch, subDir, token, pluginId, version, name, timestamp, msg;

        @JsonProperty
        private String logs;

        @JsonProperty
        private boolean skipTests;

        public String getTimestamp() {
            return timestamp;
        }

        public DeployResource resolve() {
            Matcher matcher = DEPLOYMENT_LOG_NAME_VERSION_PATTERN.matcher(logs);
            if (matcher.find()) {
                name = matcher.group(1);
                version = matcher.group(2);
                final String state = matcher.group(4);
                success = state.startsWith("success");
            } else {
                matcher = DEPLOYMENT_LOG_VERSION_PATTERN.matcher(logs);
                matcher.find();
                version = matcher.group(2);
            }

            matcher = DEPLOYMENT_LOG_TIMESTAMP_PATTERN.matcher(logs);
            matcher.find();
            timestamp = matcher.group(1);

            return this;
        }

        @Override
        public boolean equals(Object o) {
            if (this == o) return true;
            if (o == null || getClass() != o.getClass()) return false;
            DeployResource that = (DeployResource) o;
            return Objects.equals(service, that.service) &&
                    Objects.equals(repoUrl, that.repoUrl) &&
                    Objects.equals(branch, that.branch) &&
                    Objects.equals(subDir, that.subDir) &&
                    Objects.equals(pluginId, that.pluginId) &&
                    Objects.equals(version, that.version) &&
                    Objects.equals(name, that.name) &&
                    Objects.equals(timestamp, that.timestamp);
        }

        @Override
        public int hashCode() {
            return Objects.hash(service, repoUrl, branch, subDir, pluginId, version, name, timestamp);
        }

        @Override
        @JsonIgnore
        public String getId() {
            return pluginId + "_" + version + "_" + timestamp;
        }

        @Override
        public String toString() {
            return "DeployResource{" +
                    "jemoUrl='" + jemoUrl + '\'' +
                    ", success=" + success +
                    ", service='" + service + '\'' +
                    ", repoUrl='" + repoUrl + '\'' +
                    ", branch='" + branch + '\'' +
                    ", subDir='" + subDir + '\'' +
                    ", token='" + token + '\'' +
                    ", pluginId='" + pluginId + '\'' +
                    ", version='" + version + '\'' +
                    ", name='" + name + '\'' +
                    ", timestamp='" + timestamp + '\'' +
                    ", msg='" + msg + '\'' +
                    ", logs='" + logs + '\'' +
                    '}';
        }
    }

}
