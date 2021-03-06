// LICENSE_CODE ZON ISC
'use strict'; /*jslint react:true, es6:true*/
import React from 'react';
import {Code} from './common.js';
import {Instructions, Li} from './common/bullets.js';
import {T} from './common/i18n.js';

const E = {};

E.code = (proxy=24000)=>({
    shell: `curl --proxy 127.0.0.1:${proxy} "http://lumtest.com/myip.json"`,
    node: `#!/usr/bin/env node
require('request-promise')({
    url: 'http://lumtest.com/myip.json',
    proxy: 'http://127.0.0.1:${proxy}'
}).then(function(data){
    console.log(data);
}, function(err){
    console.error(err);
});`,
    java: `package example;

import org.apache.http.HttpHost;
import org.apache.http.client.fluent.*;

public class Example {
    public static void main(String[] args) throws Exception {
        HttpHost proxy = new HttpHost("127.0.0.1", ${proxy});
        String res = Executor.newInstance()
            .execute(Request.Get("http://lumtest.com/myip.json")
            .viaProxy(proxy))
            .returnContent().asString();
        System.out.println(res);
    }
}`,
    csharp: `using System;
using System.Net;

class Example
{
    static void Main()
    {
        var client = new WebClient();
        client.Proxy = new WebProxy("127.0.0.1:${proxy}");
        Console.WriteLine(client.DownloadString(
            "http://lumtest.com/myip.json"));
    }
}`,
    vb: `Imports System.Net

Module Example
    Sub Main()
        Dim Client As New WebClient
        Client.Proxy = New WebProxy("http://127.0.0.1:${proxy}")
        Console.WriteLine(Client.DownloadString(
            "http://lumtest.com/myip.json"))
    End Sub
End Module`,
    python: `#!/usr/bin/env python
print('If you get error "ImportError: No module named \\'six\\'"'+\\
    'install six:\\n$ sudo pip install six');
import sys
if sys.version_info[0]==2:
    import six
    from six.moves.urllib import request
    opener = request.build_opener(
        request.ProxyHandler(
            {'http': 'http://127.0.0.1:${proxy}'}))
    print(opener.open('http://lumtest.com/myip.json').read())
if sys.version_info[0]==3:
    import urllib.request
    opener = urllib.request.build_opener(
        urllib.request.ProxyHandler(
            {'http': 'http://127.0.0.1:${proxy}'}))
    print(opener.open('http://lumtest.com/myip.json').read())`,
    ruby: `#!/usr/bin/ruby

require 'uri'
require 'net/http'

uri = URI.parse('{{example.user_url}}')
proxy = Net::HTTP::Proxy('127.0.0.1', ${proxy})

req = Net::HTTP::Get.new(uri.path)

result = proxy.start(uri.host,uri.port) do |http|
    http.request(req)
end

puts result.body`,
    php: `<?php
    $curl = curl_init('http://lumtest.com/myip.json');
    curl_setopt($curl, CURLOPT_PROXY, 'http://127.0.0.1:${proxy}');
    curl_exec($curl);
?>`,
    perl: `#!/usr/bin/perl
use LWP::UserAgent;
my $agent = LWP::UserAgent->new();
$agent->proxy(['http', 'https'], "http://127.0.0.1:${proxy}");
print $agent->get('http://lumtest.com/myip.json')->content();`,
});

const Last_step = ()=>
    <Li>
      <T>You are all set! Open a</T>
      <a className="link" onClick={()=>window.open()}><T>new tab</T></a>
      <T>and start browsing.</T>
    </Li>;

E.browser = (proxy=24000)=>({
    chrome_win:
        <Instructions>
          <Li><T>Open</T><Code>chrome://settings/</Code> <T>in a</T>
            <a className="link" onClick={()=>window.open()}>
              <T>new tab</T></a>
          </Li>
          <Li><T>Click</T><code><T>Advanced</T></code></Li>
          <Li><T>In the</T><code><T>System</T></code> <T>section, click</T>
            <code><T>Open proxy settings</T></code></Li>
          <Li><T>Click</T><code><T>LAN settings</T></code></Li>
          <Li>
            <T>Select the</T>
            <code><T>Use a proxy server for your LAN</T></code>
            <T>check-box under</T><code><T>Proxy Server</T></code>
          </Li>
          <Li>
            <T>Enter</T><code><T>Address</T></code>:
            <Code>127.0.0.1</Code> <T>and</T> <code> <T>Port</T></code>:
            <Code> {proxy}</Code>
          </Li>
          <Li>
            <T>Check the "Bypass proxy server for local addresses"
              check-box</T>
          </Li>
          <Li><T>Save changes by pressing</T><code><T>OK</T></code></Li>
          <Li><T>Restart browser</T></Li>
          <Last_step/>
        </Instructions>,
    chrome_mac:
        <Instructions>
          <Li>
            <T>Open</T><Code>chrome://settings/</Code><T>in a</T>
            <a className="link" onClick={()=>window.open()}><T>new tab</T></a>
          </Li>
          <Li><T>Click</T><code><T>Advanced</T></code></Li>
          <Li>
            <T>In the</T><code><T>Network</T></code><T>section, click</T>
            <code><T>Change proxy settings</T></code>
          </Li>
          <Li><T>System Preferences should start up automatically, with the
            Network window open and Proxies selected.</T></Li>
          <Li>
            <T>Choose</T><code><T>Web Proxy (HTTP)</T></code><T>and</T><code>
            <T>Secure Web Proxy (HTTPS)</T></code></Li>
          <Li>
            <T>Enter</T><code><T>Address</T></code>: <Code>127.0.0.1</Code>
            <T>and</T><code><T>Port</T></code>: <Code> {proxy}</Code>
          </Li>
          <Li><T>Save changes by pressing</T><code><T>OK</T></code></Li>
          <Li><T>Restart browser</T></Li>
          <Last_step/>
        </Instructions>,
    ie:
        <Instructions>
          <Li>
            <T>Click the Tools button, and then click Internet options.</T>
          </Li>
          <Li><T>Click the Connections tab.</T></Li>
          <Li><T>Click</T><code><T>LAN settings</T></code></Li>
          <Li>
            <T>Select the</T>
            <code><T>Use a proxy server for your LAN</T></code>
            <T>check-box.</T>
          </Li>
          <Li>
            <T>Enter</T><code><T>Address</T></code>: <Code>127.0.0.1</Code>
            <T>and</T>
            <code><T>Port</T></code>: <Code> {proxy}</Code>
          </Li>
          <Li><T>Save changes by pressing</T><code><T>OK</T></code></Li>
          <Last_step/>
        </Instructions>,
    firefox:
        <Instructions>
          <Li>
            <T>Open</T><Code>about:preferences</Code><T>in a</T>
            <a className="link" onClick={()=>window.open()}><T>new tab</T></a>
          </Li>
          <Li>
            <T>Click the</T><code><T>General</T></code>
            <T>tab and scroll down to</T><code><T>Network Settings</T></code>
          </Li>
          <Li>
            <T>Open network settings by clicking</T>
            <code><T>Settings...</T></code><T>button.</T></Li>
          <Li>
            <T>Choose</T><code><T>Manual proxy configuration</T></code>
            <T>radio button.</T>
          </Li>
          <Li>
            <T>Enter</T><code><T>HTTP Proxy</T></code>: <Code>127.0.0.1</Code>
            <T>and</T><code><T>Port</T></code>: <Code>{proxy}</Code>
          </Li>
          <Li>
            <T>Tick</T>
            <code><T>Use this proxy server for all protocols</T></code>
            <T>check-box.</T>
          </Li>
          <Li>
            <T>Add</T><code>localhost,127.0.0.1</code>
            <T>to "No proxy for:" text area</T>
          </Li>
          <Li><T>Save changes by pressing</T><code><T>OK</T></code></Li>
          <Last_step/>
        </Instructions>,
    safari:
        <Instructions>
          <Li>
            <T>Pull down the Safari menu and select</T>
            <code><T>Preferences</T></code>
          </Li>
          <Li><T>Click on the</T><code><T>Advanced</T></code><T>icon.</T></Li>
          <Li>
            <T>In the</T><code><T>Proxies</T></code>
            <T>option, click on Change Settings.</T>
          </Li>
          <Li>
            <T>System Preferences should start up automatically, with the
              Network window open and Proxies selected.</T>
          </Li>
          <Li><T>Choose</T><code><T>Web Proxy (HTTP)</T></code></Li>
          <Li>
            <T>Enter</T><code><T>Web Proxy Server</T></code>:
            <Code>127.0.0.1</Code><T>and</T><code>Port</code>:
            <Code> {proxy}</Code>
          </Li>
          <Li><T>Save changes by pressing</T><code><T>OK</T></code></Li>
          <Last_step/>
        </Instructions>,
});

export default E;
