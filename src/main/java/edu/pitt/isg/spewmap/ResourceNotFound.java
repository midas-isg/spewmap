package edu.pitt.isg.spewmap;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.NOT_FOUND)
public class ResourceNotFound extends RuntimeException{
    public ResourceNotFound(String message, Throwable cause){
        super(message, cause);
    }
}
