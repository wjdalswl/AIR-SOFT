package com.project.airsoft.dto;

import java.time.LocalDate;
import lombok.Data;

@Data
public class SignRequest {

    private String username;

    private String password;

    private String korName;

    private String engName;

    private LocalDate birth;

    private String phone;

    private String email;
}
