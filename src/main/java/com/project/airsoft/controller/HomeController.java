package com.project.airsoft.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class HomeController {

    @GetMapping("/TicketReservation")
    public String toHome() {
        return "redirect:/";
    }

    @GetMapping("/ReservationInquiry")
    public String toHome2() {
        return "redirect:/";
    }

    @GetMapping("/CheckIn")
    public String toHome3() {
        return "redirect:/";
    }

    @GetMapping("/FlightStatus")
    public String toHome4() {
        return "redirect:/";
    }

    @GetMapping("/Ticket")
    public String toHome5() {
        return "redirect:/";
    }
}
