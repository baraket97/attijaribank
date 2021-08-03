package com.bezkoder.springjwt.controllers;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import com.bezkoder.springjwt.models.Programe;
import com.bezkoder.springjwt.repository.ProgrameRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api")
public class ProgrameController {

	@Autowired
	ProgrameRepository programeRepository;

	@GetMapping("programes")
	public ResponseEntity<List<Programe>> getAllProgrames(@RequestParam(required = false) String owner) {
		try {
			List<Programe> programe = new ArrayList<Programe>();

			if (owner == null)
				programeRepository.findAll().forEach(programe::add);
			else
			// programeRepository.findByOwnerContaining(owner).forEach(programe::add);

			if (programe.isEmpty()) {
				return new ResponseEntity<>(HttpStatus.NO_CONTENT);
			}

			return new ResponseEntity<>(programe, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@GetMapping("/programes/{id}")
	public ResponseEntity<Programe> getProgrameById(@PathVariable("id") long id) {
		Optional<Programe> programeData = programeRepository.findById(id);

		if (programeData.isPresent()) {
			return new ResponseEntity<>(programeData.get(), HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}

	@PostMapping("/programes")
	public ResponseEntity<Programe> createPrograme(@RequestBody Programe programe) {
		try {
			Programe _programe = programeRepository.save(
					new Programe(programe.getTitle(), programe.getDate(), programe.getDuree(), programe.getConstat(),
							programe.getCause(), programe.getDelait(), programe.getConseq(), programe.getAction()));
			return new ResponseEntity<>(_programe, HttpStatus.CREATED);
		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@PutMapping("/programes/{id}")
	public ResponseEntity<Programe> updatePrograme(@PathVariable("id") long id, @RequestBody Programe programe) {
		Optional<Programe> programeData = programeRepository.findById(id);

		if (programeData.isPresent()) {
			Programe _programe = programeData.get();
			_programe.setTitle(programe.getTitle());
			_programe.setDate(programe.getDate());
			_programe.setDuree(programe.getDuree());
			_programe.setConstat(programe.getConstat());
			_programe.setCause(programe.getCause());
			_programe.setDelait(programe.getDelait());
			_programe.setConseq(programe.getConseq());
			_programe.setAction(programe.getAction());

			return new ResponseEntity<>(programeRepository.save(_programe), HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}

	@DeleteMapping("/programes/{id}")
	public ResponseEntity<HttpStatus> deletePrograme(@PathVariable("id") long id) {
		try {
			programeRepository.deleteById(id);
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@DeleteMapping("/programes")
	public ResponseEntity<HttpStatus> deleteAllProgrames() {
		try {
			programeRepository.deleteAll();
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
}
