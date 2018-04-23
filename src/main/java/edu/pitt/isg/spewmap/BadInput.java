package edu.pitt.isg.spewmap;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.BAD_REQUEST)
public class BadInput extends RuntimeException{
    public BadInput(String message, Throwable cause){
        super(message, cause);
    }
}
