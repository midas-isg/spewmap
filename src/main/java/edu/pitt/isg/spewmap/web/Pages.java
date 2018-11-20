package edu.pitt.isg.spewmap.web;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class Pages {
    @GetMapping("/")
    public String index(){
        return "index";
    }

    @GetMapping("/map")
    public String map(){
        return "index";
    }
/*
    @GetMapping("/tile")
    public String tile(){
        return "single-tile";
    }

    @GetMapping("/tiles")
    public String tiles(){
        return "tiles";
    }
*/
}
