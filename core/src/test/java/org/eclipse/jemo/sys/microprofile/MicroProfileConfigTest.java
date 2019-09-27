/*
 ********************************************************************************
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

package org.eclipse.jemo.sys.microprofile;

import static org.junit.Assert.*;

import java.util.Map;
import java.util.Optional;
import java.util.Properties;
import java.util.concurrent.CountDownLatch;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.atomic.AtomicReference;
import java.util.concurrent.locks.Lock;
import java.util.concurrent.locks.ReentrantLock;
import java.util.regex.Pattern;

import javax.enterprise.inject.spi.DeploymentException;
import javax.inject.Inject;
import javax.inject.Provider;

import org.eclipse.jemo.JemoGSMTest;
import org.eclipse.jemo.api.FixedModule;
import org.eclipse.jemo.api.KeyValue;
import org.eclipse.jemo.sys.JemoClassLoader;
import org.eclipse.jemo.sys.JemoPluginManager;
import org.eclipse.jemo.sys.internal.JarEntry;
import org.eclipse.jemo.sys.internal.Util;
import org.eclipse.microprofile.config.ConfigProvider;
import org.eclipse.microprofile.config.inject.ConfigProperty;
import org.eclipse.microprofile.config.spi.Converter;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;

public class MicroProfileConfigTest extends JemoGSMTest {
	Lock sequential = new ReentrantLock();

	@Before
	public void setUp() throws Exception {
	    sequential.lock();
	}

	@After
	public void tearDown() throws Exception {
	    sequential.unlock();
	}
	
	static AtomicReference<String> configValue = new AtomicReference<>();
	static CountDownLatch WAIT_LATCH = new CountDownLatch(1);
	static CountDownLatch CHANGE_CONFIG_LATCH = new CountDownLatch(1);
	
	public static class TestFixedModule implements FixedModule {

		@Override
		public void processFixed(String location, String instanceId) throws Throwable {
			configValue.set(ConfigProvider.getConfig().getValue("config", String.class));
			WAIT_LATCH.countDown();
			CHANGE_CONFIG_LATCH.await(5, TimeUnit.SECONDS);
			configValue.set(ConfigProvider.getConfig().getValue("config", String.class));
			WAIT_LATCH.countDown();
		}
		
	}
	
	static AtomicReference<TestInjectedConfigModule> INJECTED_CONFIG = new AtomicReference<>(null);
	
	public static class LongConverter implements Converter<Long> {
		final Pattern IS_DIGIT = Pattern.compile("[0-9]+");
		
		@Override
		public Long convert(String value) {
			if(IS_DIGIT.matcher(value).matches()) {
				return Long.getLong(value);
			}
			return null;
		}
	}
	
	public static class TestInjectedConfigModule implements FixedModule {
		
		@Inject
		@ConfigProperty(name = "config")
		public String value;
		
		@Inject
		@ConfigProperty(name = "config_default", defaultValue = "default")
		public String value2;
		
		@Inject
		@ConfigProperty(name = "config_missing")
		public String value3;
		
		@Inject
		@ConfigProperty(name = "config_opt")
		public Optional<String> value4;
		
		@Inject
		@ConfigProperty(name = "config_opt_missing")
		public Optional<String> value5;
		
		@Inject
		@ConfigProperty(name = "config_dynamic")
		public Provider<String> value6;
		
		@Inject
		@ConfigProperty(name = "config_dynamic_missing")
		public Provider<String> value7;
		
		@Inject
		@ConfigProperty
		public Optional<String> value8;
		
		@Inject
		@ConfigProperty(name = "config_default_lambda")
		public Provider<String> value9 = () -> "value";
		
		@Inject
		@ConfigProperty(defaultValue = "value")
		public Optional<String> value10;
		
		@Inject
		@ConfigProperty(defaultValue = "value")
		public Provider<String> value11;
		
		//let's add some non string variable values to test the conversion a bit.
		@Inject
		@ConfigProperty(name = "long_value")
		public long long_value;
		
		@Inject
		@ConfigProperty(name = "long_array")
		public long[] long_array;
		
		@Inject
		@ConfigProperty(name = "generic_object")
		public Map<String,String> generic_object_value;
		
		//and now a custom object
		public static class CustomObject {
			public int id;
			public String name;
			public double version;
		}
		
		@Inject
		@ConfigProperty(name = "custom_object")
		public CustomObject custom_value;
		
		@Override
		public void processFixed(String location, String instanceId) throws Throwable {
			INJECTED_CONFIG.set(this);
			WAIT_LATCH.countDown();
		}
		
	}
	
	@Test
	public void testFixedModuleConfigAccess() throws Throwable {
		//1. let's set a jemo configuration value for our module.
		setModuleConfig(301, new KeyValue<>("config", "value"));
		//2. run our fixed process to grab the configured value
		uploadPlugin(301, 1.0, "MicroProfileConfigTestFixed", TestFixedModule.class);
		startFixedProcesses();
		WAIT_LATCH.await(5, TimeUnit.SECONDS);
		assertEquals("value", configValue.get());
		setModuleConfig(301, new KeyValue<>("config", "value2"));
		WAIT_LATCH = new CountDownLatch(1);
		CHANGE_CONFIG_LATCH.countDown();
		WAIT_LATCH.await(5, TimeUnit.SECONDS);
		assertEquals("value2", configValue.get());
		
		//3. we should now test the various scenarios for resource injected configuration values
		setModuleConfig(302, new KeyValue<>("config", "value"), new KeyValue<>("config_opt", "value"), new KeyValue<>("config_dynamic","value"),
				new KeyValue<>("config_dynamic_missing","value"));
		Throwable configEx = null;
		try {
			uploadPlugin(302, 1.0, "MicroProfileConfigTestInjected", TestInjectedConfigModule.class);
		}catch(Throwable ex) {
			configEx = ex;
		}
		assertNotNull(configEx);
		assertTrue(configEx instanceof DeploymentException);
		
		
		//3.1 let's validate if we set a configuration value the static missing value but not the dynamic value we should have the same error.
		setModuleConfig(303, new KeyValue<>("config", "value"), new KeyValue<>("config_opt", "value"), new KeyValue<>("config_dynamic","value"),
				new KeyValue<>("config_missing","value"));
		configEx = null;
		try {
			uploadPlugin(303, 1.0, "MicroProfileConfigTestInjected", TestInjectedConfigModule.class);
		}catch(Throwable ex) {
			configEx = ex;
		}
		assertNotNull(configEx);
		assertTrue(configEx instanceof DeploymentException);
		
		//3.2 let's validate that the values are what we would expect them to be.
		setModuleConfig(304, new KeyValue<>("config", "value"), new KeyValue<>("config_opt", "value"), new KeyValue<>("config_dynamic","value"),
				new KeyValue<>("config_missing","value"),new KeyValue<>("config_dynamic_missing","value"),
				new KeyValue<>("long_value","10"), new KeyValue<>("long_array","[1,2,3,4,5]"),
				new KeyValue<>("generic_object","{ \"key\" : \"value\" }"), 
				new KeyValue<>("custom_object","{ \"id\" : 5, \"name\" : \"aaa\", \"version\" : 1.5 }"),
				new KeyValue<>("config_default_lambda","value9"));
		uploadPlugin(304, 1.0, "MicroProfileConfigTestInjected", TestInjectedConfigModule.class, LongConverter.class);
		startFixedProcesses();
		WAIT_LATCH.await(5, TimeUnit.SECONDS);
		assertEquals("value",INJECTED_CONFIG.get().value);
		assertEquals("default", INJECTED_CONFIG.get().value2);
		assertEquals("value", INJECTED_CONFIG.get().value3);
		assertEquals("value", INJECTED_CONFIG.get().value4.orElse(null));
		assertFalse(INJECTED_CONFIG.get().value5.isPresent());
		assertEquals("value", INJECTED_CONFIG.get().value6.get());
		assertEquals("value", INJECTED_CONFIG.get().value7.get());
		assertEquals(10, INJECTED_CONFIG.get().long_value);
		assertEquals("value9", INJECTED_CONFIG.get().value9.get());
		assertEquals("value", INJECTED_CONFIG.get().value10.get());
		assertEquals("value", INJECTED_CONFIG.get().value11.get());
		WAIT_LATCH = new CountDownLatch(1);
		
		//3.3 we now need to dynamically update the config_dynamic value and it should change as a consequence.
		setModuleConfig(304, new KeyValue<>("config_dynamic", "value2"));
		startFixedProcesses();
		WAIT_LATCH.await(5, TimeUnit.SECONDS);
		assertEquals("value2", INJECTED_CONFIG.get().value6.get());
		
		WAIT_LATCH = new CountDownLatch(1);
		removeModuleConfig(304, "config_dynamic_missing");
		startFixedProcesses();
		WAIT_LATCH.await(5, TimeUnit.SECONDS);
		assertNull(INJECTED_CONFIG.get().value7.get());
	}
}
