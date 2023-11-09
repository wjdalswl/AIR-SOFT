package com.project.airsoft.controller;

import lombok.extern.log4j.Log4j;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Slf4j
public class TestController {

    @GetMapping("/api/hello")
    public String test() {
        log.info("테스트");
        return "Hello, World";
    }

    @GetMapping("/api/hello2")
    public String test2() {
        return "테스트";
    }
}
