package com.project.airsoft.dto;

import com.project.airsoft.domain.Authority;
import com.project.airsoft.domain.User;
import java.util.ArrayList;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class SignResponse {
    private Long id;

    private String username;


    private String email;

    private List<Authority> roles = new ArrayList<>();

    private String token;

    public SignResponse(User user) {
        this.id = user.getId();
        this.username = user.getUsername();
        this.email = user.getEmail();
        this.roles = user.getRoles();
    }
}
