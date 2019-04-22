package com.myse1f.mycoinui;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication(scanBasePackages = "com.myse1f.mycoinui")
public class MycoinUiApplication {

    public static void main(String[] args) {
        SpringApplication.run(MycoinUiApplication.class, args);
    }

}
