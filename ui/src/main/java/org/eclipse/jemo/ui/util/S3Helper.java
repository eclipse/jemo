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
package org.eclipse.jemo.ui.util;

import com.amazonaws.services.s3.AmazonS3Client;

/**
 * this is an amazon S3 helper class which will allow us to run a few common operations on an S3 bucket.
 *
 * @author Christopher Stura "christopher.stura@cloudreach.com"
 */
public class S3Helper {
    public static boolean bucketExists(AmazonS3Client s3client, String bucket) {
        return s3client.doesBucketExist(bucket);
    }
}
