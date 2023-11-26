package com.project.airsoft.service;

import com.project.airsoft.domain.Authority;
import com.project.airsoft.domain.User;
import com.project.airsoft.dto.SignRequest;
import com.project.airsoft.dto.SignResponse;
import com.project.airsoft.repository.UserRepository;
import com.project.airsoft.security.JwtProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.Collections;

@Service
@Transactional
@RequiredArgsConstructor
public class SignService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtProvider jwtProvider;

    public SignResponse login(SignRequest request) throws Exception {
        User user = userRepository.findByUsername(request.getUsername()).orElseThrow(() ->
                new BadCredentialsException("잘못된 계정정보입니다."));

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new BadCredentialsException("비밀번호가 틀렸습니다.");
        }

        return SignResponse.builder()
                .id(user.getId())
                .username(user.getUsername())
                .email(user.getEmail())
                .roles(user.getRoles())
                .token(jwtProvider.createToken(user.getUsername(), user.getRoles()))
                .build();

    }

    public String register(SignRequest request) throws Exception {
        try {
            User user = User.builder()
                    .username(request.getUsername())
                    .password(passwordEncoder.encode(request.getPassword()))
                    .email(request.getEmail())
                    .birth(request.getBirth())
                    .engName(request.getEngName())
                    .korName(request.getKorName())
                    .phone(request.getPhone())
                    .build();

            user.setRoles(Collections.singletonList(Authority.builder().name("ROLE_USER").build()));

            userRepository.save(user);
        } catch (Exception e) {
            System.out.println(e.getMessage());
            throw new Exception("잘못된 요청입니다.");
        }
        return "true";
    }

    public SignResponse getUser(String account) throws Exception {
        User user = userRepository.findByUsername(account)
                .orElseThrow(() -> new Exception("계정을 찾을 수 없습니다."));
        return new SignResponse(user);
    }

}
