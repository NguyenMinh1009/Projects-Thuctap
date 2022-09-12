package com.example.cruicio.controller;

import java.util.List;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.example.cruicio.entity.User;
import com.example.cruicio.exception.custom.CustomBadRequestException;
import com.example.cruicio.exception.custom.CustomNotFoundException;
import com.example.cruicio.service.IUserService;

import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;

@Controller
@RequiredArgsConstructor
@RequestMapping("/users")
public class UserController {

    private final IUserService iUserService;

    @GetMapping("")
    public String getAllUser(Model model) {
        List<User> listUsers = iUserService.getAllUsers();
        model.addAttribute("listUsers", listUsers);
        return "main";
    }

    @GetMapping("/getUser")
    public String getUserById(Model model, HttpServletRequest req) {
        int id = Integer.parseInt(req.getParameter("id"));
        User user = iUserService.getUserById(id);
        model.addAttribute("User", user);
        return "UpdateUser";

    }

    @PostMapping(value ="/addUser")
    public String createUser(HttpServletRequest req) {
        String name = req.getParameter("name");
        String email = req.getParameter("email");
        String message = req.getParameter("message");
        User user = User.builder().name(name).email(email).message(message).build();
        iUserService.createUser(user);
        
        return "redirect:/users";
    }

    @RequestMapping(value = "/updateUser", method = {RequestMethod.PUT, RequestMethod.GET})
    public String updateUser(User user) {
        iUserService.updateUser(user);
        return "redirect:/users";
    }

    @GetMapping(value = "/deleteUser")
    public String deleteUser(HttpServletRequest req) {
        int id = Integer.parseInt(req.getParameter("id"));
        iUserService.deleteUserById(id);
        return "redirect:/users";
    }
}
