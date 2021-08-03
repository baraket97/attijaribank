package com.bezkoder.springjwt.repository;

import com.bezkoder.springjwt.models.Programe;

import org.springframework.data.jpa.repository.JpaRepository;

public interface ProgrameRepository extends JpaRepository<Programe, Long> {

	// List<Programe> findByOwnerContaining(String owner);
}
