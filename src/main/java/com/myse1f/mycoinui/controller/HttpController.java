/**
 * Created By Yufan Wu
 * 2019/5/1
 */
package com.myse1f.mycoinui.controller;

import com.myse1f.mycoinui.util.HttpClientResult;
import com.myse1f.mycoinui.util.HttpClientUtils;
import org.apache.http.HttpException;
import org.apache.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
public class HttpController {
    private static String urlPrefix = "http://127.0.0.1:8081/mycoin/api/";

    @GetMapping("/block/{hash}")
    public String getBlock(@PathVariable("hash") String hash) throws Exception {
        HttpClientResult httpResult = HttpClientUtils.doGet(urlPrefix + "/block/" + hash);
        if (httpResult.getCode() != HttpStatus.SC_OK) {
            throw new HttpException("Error!");
        }
        return httpResult.getContent();
    }

    @GetMapping("/recentblocks")
    public String getRecentBlocks() throws Exception {
        HttpClientResult httpResult = HttpClientUtils.doGet(urlPrefix + "/recentblocks/");
        if (httpResult.getCode() != HttpStatus.SC_OK) {
            throw new HttpException("Error!");
        }
        return httpResult.getContent();
    }

    @GetMapping("/allblocks")
    public String getAllBlocks() throws Exception {
        HttpClientResult httpResult = HttpClientUtils.doGet(urlPrefix + "/allblocks/");
        if (httpResult.getCode() != HttpStatus.SC_OK) {
            throw new HttpException("Error!");
        }
        return httpResult.getContent();
    }

    @GetMapping("/peers")
    public String getPeers() throws Exception {
        HttpClientResult httpResult = HttpClientUtils.doGet(urlPrefix + "/peers/");
        if (httpResult.getCode() != HttpStatus.SC_OK) {
            throw new HttpException("Error!");
        }
        return httpResult.getContent();
    }

    @PatchMapping("/peer")
    public String connectPeer(@RequestParam(value = "address") String address, @RequestParam(value = "port", defaultValue = "23333") int port) throws Exception {
        Map<String, String> params = new HashMap<>();
        params.put("address", address);
        params.put("port", "" + port);
        HttpClientResult httpResult = HttpClientUtils.doPatch(urlPrefix + "/peer/", params);
        if (httpResult.getCode() != HttpStatus.SC_CREATED) {
            throw new HttpException("Error!");
        }
        return httpResult.getContent();
    }

    @GetMapping("/miner")
    public String getMinerStatus() throws Exception {
        HttpClientResult httpResult = HttpClientUtils.doGet(urlPrefix + "/miner/");
        if (httpResult.getCode() != HttpStatus.SC_OK) {
            throw new HttpException("Error!");
        }
        return httpResult.getContent();
    }

    @PatchMapping("/miner")
    public String startMiner() throws Exception {
        HttpClientResult httpResult = HttpClientUtils.doPatch(urlPrefix + "/miner/");
        if (httpResult.getCode() != HttpStatus.SC_CREATED) {
            throw new HttpException("Error!");
        }
        return httpResult.getContent();
    }

    @DeleteMapping("/miner")
    public String stopMiner() throws Exception {
        HttpClientResult httpResult = HttpClientUtils.doDelete(urlPrefix + "/miner/");
        if (httpResult.getCode() != HttpStatus.SC_OK) {
            throw new HttpException("Error!");
        }
        return httpResult.getContent();
    }

    @GetMapping("/network")
    public String getNetworkStatus() throws Exception {
        HttpClientResult httpResult = HttpClientUtils.doGet(urlPrefix + "/network/");
        if (httpResult.getCode() != HttpStatus.SC_OK) {
            throw new HttpException("Error!");
        }
        return httpResult.getContent();
    }
//
//    @PatchMapping("/network")
//    public String startNetwork() {
//
//    }

    @DeleteMapping("/network")
    public String stopNetwork() throws Exception {
        HttpClientResult httpResult = HttpClientUtils.doDelete(urlPrefix + "/network/");
        if (httpResult.getCode() != HttpStatus.SC_OK) {
            throw new HttpException("Error!");
        }
        return httpResult.getContent();
    }
}