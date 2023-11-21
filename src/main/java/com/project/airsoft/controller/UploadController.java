package com.project.airsoft.controller;

import com.project.airsoft.service.FlightService;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardCopyOption;

@Controller
@RequiredArgsConstructor
public class UploadController {

    private final FlightService flightService;

    @GetMapping("/admin")
    public String showForm() {
        return "uploadForm";
    }

    @PostMapping("/admin/upload")
    public String handleFileUpload(@RequestParam("file") MultipartFile file, Model model) {
        if (file.isEmpty()) {
            model.addAttribute("message", "Please select a file to upload.");
            return "uploadForm";
        }

        try {
            String uploadDir = "uploads/";
            Path uploadPath = Path.of(uploadDir);
            Files.createDirectories(uploadPath);

            String fileName = file.getOriginalFilename();
            Path filePath = uploadPath.resolve(fileName);
            Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);

            processCsv(file);

            model.addAttribute("message", "File uploaded successfully!");
        } catch (IOException e) {
            e.printStackTrace();
            model.addAttribute("message", "Error uploading the file.");
        }

        return "uploadForm";
    }

    private void processCsv(MultipartFile file) {
        String dateString1 = "2023.11.21";
        String dateString2 = "2023.12.31";

        // Define the format of the input string
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy.MM.dd");

        // Parse the string into LocalDateTime
        LocalDate localDateTime1 = LocalDate.parse(dateString1, formatter);
        LocalDate localDateTime2 = LocalDate.parse(dateString2, formatter);
        flightService.processCsv(file, localDateTime1, localDateTime2);
        // 여기에 CSV 파일을 처리하는 로직을 추가하세요
        // 예를 들어, 파일을 읽어서 데이터베이스에 저장하는 등의 작업을 수행할 수 있습니다.


    }
}

