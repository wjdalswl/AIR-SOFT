package com.project.airsoft.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class MyPageController {

    @GetMapping("/my-page")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<String> getMyPage(Authentication authentication) {
        // 현재 인증된 사용자의 이름을 가져옵니다.
        String username = authentication.getName();

        // 요청한 페이지가 현재 사용자의 페이지인지 확인합니다.
        if (isCurrentUserPage(username)) {
            // 사용자 페이지의 데이터를 가져오고 반환하는 로직을 구현합니다.
            return ResponseEntity.ok(username + "님, 환영합니다!");
        } else {
            // 현재 사용자가 다른 사용자의 페이지에 액세스하려고 할 때 권한 없음을 반환합니다.
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("You are not authorized to access this page.");
        }
    }

    // 실제로는 데이터베이스 또는 다른 저장소에서 현재 사용자와 페이지 소유자를 비교하는 로직이 필요합니다.
    private boolean isCurrentUserPage(String username) {
        // 이 예제에서는 단순히 사용자 이름이 일치하면 같은 사용자로 간주합니다.
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return authentication != null && authentication.getName().equals(username);
    }
}
