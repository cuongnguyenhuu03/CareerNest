package com.nhc.CareerNest.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.nhc.CareerNest.domain.dto.response.RestResponse;
import com.nhc.CareerNest.domain.entity.Role;
import com.nhc.CareerNest.service.impl.RoleService;
import com.nhc.CareerNest.util.anotation.ApiMessage;
import com.nhc.CareerNest.util.exception.IdInvalidException;

@RestController
@RequestMapping("/api/v1")
public class RoleController {

    private final RoleService roleService;

    public RoleController(RoleService roleService) {
        this.roleService = roleService;
    }

    @PostMapping("/roles")
    @ApiMessage("Create a role")
    public ResponseEntity<RestResponse> create(@RequestBody Role r) throws IdInvalidException {
        // check name
        if (this.roleService.existByName(r.getName())) {
            throw new IdInvalidException("Role with name = " + r.getName() + " already exist");
        }

        RestResponse res = new RestResponse();
        res.setStatusCode(HttpStatus.OK.value());
        res.setData(this.roleService.create(r));
        res.setMessage("create a new role successfully");

        return ResponseEntity.ok(res);
    }

    @PutMapping("/roles")
    @ApiMessage("Update a role")
    public ResponseEntity<RestResponse> update(@RequestBody Role r) throws IdInvalidException {
        // check id
        if (this.roleService.fetchById(r.getId()) == null) {
            throw new IdInvalidException("Role with id = " + r.getId() + " not exist");
        }

        RestResponse res = new RestResponse();
        res.setStatusCode(HttpStatus.OK.value());
        res.setData(this.roleService.update(r));
        res.setMessage("update a role successfully");

        return ResponseEntity.ok(res);
    }

    @DeleteMapping("/roles/{id}")
    @ApiMessage("Delete a role")
    public ResponseEntity<RestResponse> delete(@PathVariable("id") long id) throws IdInvalidException {
        // check id
        if (this.roleService.fetchById(id) == null) {
            throw new IdInvalidException("Role with id = " + id + " not exist");
        }
        this.roleService.delete(id);

        RestResponse res = new RestResponse();
        res.setStatusCode(HttpStatus.OK.value());
        res.setMessage("delete a role successfully");

        return ResponseEntity.ok(res);
    }

    @GetMapping("/roles")
    @ApiMessage("Fetch roles")
    public ResponseEntity<RestResponse> getRoles() {

        RestResponse res = new RestResponse();
        res.setStatusCode(HttpStatus.OK.value());
        res.setData(roleService.getRoles());
        res.setMessage("update a role successfully");

        return ResponseEntity.ok(res);
    }

    @GetMapping("/roles/{id}")
    @ApiMessage("Fetch role by id")
    public ResponseEntity<RestResponse> getById(@PathVariable("id") long id) throws IdInvalidException {

        Role role = this.roleService.fetchById(id);
        if (role == null) {
            throw new IdInvalidException("Resume with id = " + id + " not exist");
        }

        RestResponse res = new RestResponse();
        res.setStatusCode(HttpStatus.OK.value());
        res.setData(role);
        res.setMessage("fetch a role successfully");

        return ResponseEntity.ok(res);
    }
}
