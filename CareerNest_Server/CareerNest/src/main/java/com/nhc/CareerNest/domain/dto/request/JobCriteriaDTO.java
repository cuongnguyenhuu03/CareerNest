package com.nhc.CareerNest.domain.dto.request;

import java.util.List;
import java.util.Optional;

public class JobCriteriaDTO {

    private Optional<String> name;
    private Optional<List<String>> location;
    private Optional<List<String>> level;

    public Optional<String> getName() {
        return name;
    }

    public void setName(Optional<String> name) {
        this.name = name;
    }

    public Optional<List<String>> getLocation() {
        return location;
    }

    public void setLocation(Optional<List<String>> location) {
        this.location = location;
    }

    public Optional<List<String>> getLevel() {
        return level;
    }

    public void setLevel(Optional<List<String>> level) {
        this.level = level;
    }

}
