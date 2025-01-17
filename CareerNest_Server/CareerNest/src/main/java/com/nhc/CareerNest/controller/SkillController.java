package com.nhc.CareerNest.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.nhc.CareerNest.domain.dto.response.RestResponse;
import com.nhc.CareerNest.domain.entity.Skill;
import com.nhc.CareerNest.service.impl.SkillService;
import com.nhc.CareerNest.util.exception.IdInvalidException;

@RestController
@RequestMapping("/api/v1")
public class SkillController {

    private final SkillService skillService;

    public SkillController(SkillService skillService) {
        this.skillService = skillService;
    }

    @PostMapping("/skills")
    public ResponseEntity<RestResponse> createSkill(@RequestBody Skill skill) throws IdInvalidException {

        // check skill exist
        if (skill.getName() != null && this.skillService.checkExistsName(skill.getName())) {
            throw new IdInvalidException("This skill already exists");
        }
        RestResponse res = new RestResponse();
        res.setStatusCode(HttpStatus.OK.value());
        res.setData(this.skillService.addSkill(skill));

        return ResponseEntity.ok(res);
    }

    @PutMapping("/skills")
    public ResponseEntity<RestResponse> updateSkill(@RequestBody Skill skill) throws IdInvalidException {
        if (skill.getName() != null && this.skillService.checkExistsName(skill.getName())) {
            throw new IdInvalidException("This skill already exists");
        }

        Skill updateSkill = this.skillService.updateSkill(skill);
        if (updateSkill == null) {
            throw new IdInvalidException("skill not found");
        }
        RestResponse res = new RestResponse();
        res.setStatusCode(HttpStatus.OK.value());
        res.setData(updateSkill);

        return ResponseEntity.ok(res);
    }

    @GetMapping("/skills")
    public ResponseEntity<RestResponse> getAllSkill() {
        RestResponse res = new RestResponse();
        res.setStatusCode(HttpStatus.OK.value());
        res.setData(this.skillService.fetchAllSkill());

        return ResponseEntity.ok(res);
    }

}
