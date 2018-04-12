package edu.pitt.isg.spewmap;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

@RestController
@RequiredArgsConstructor
public class HouseholdController {
    private final HouseholdRepo repo;

    @GetMapping("/household/{id}")
    public Household read(@PathVariable Long id){
        final Optional<Household> hh = repo.findById(id);
        return hh.get();
    }
}
