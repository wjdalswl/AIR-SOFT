package com.project.airsoft.dto;

import lombok.Data;

@Data
public class SignRequest {

    private Long id;

    private String username;

    private String password;

    private String nickname;

    private String name;

    private String email;
}
