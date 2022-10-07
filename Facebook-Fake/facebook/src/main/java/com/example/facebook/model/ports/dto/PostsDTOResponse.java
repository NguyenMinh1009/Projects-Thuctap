package com.example.facebook.model.ports.dto;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.Date;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PostsDTOResponse {
    private int id;
    private String title;
    private LocalDateTime date;
    private String body;
    private AuthorDTOResponse author;

}
