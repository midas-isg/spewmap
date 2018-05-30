package edu.pitt.isg.spewmap.web;

import edu.pitt.isg.spewmap.spe.Household;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@Controller
public class Pages {
    @GetMapping()
    public String index(){
        return "index";
    }

    @GetMapping("/map")
    public String map(){
        return "tile";
    }
}
