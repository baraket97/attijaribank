package com.bezkoder.springjwt.models;

import java.util.List;

import javax.persistence.*;

@Entity
@Table(name = "programes")
public class Programe {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private long id;
  private String title;
  private String date;
  private String duree;
  private String constat;
  private String cause;
  private String delait;
  private String conseq;
  private String action;

  public Programe() {

  }

  public Programe(String title, String date, String duree, String constat, String cause, String delait, String conseq,
      String action) {
    this.title = title;
    this.date = date;
    this.duree = duree;
    this.constat = constat;
    this.cause = cause;
    this.delait = delait;
    this.conseq = conseq;
    this.action = action;
  }

  public long getId() {
    return id;
  }

  public void setId(long id) {
    this.id = id;
  }

  public String getTitle() {
    return title;
  }

  public void setTitle(String title) {
    this.title = title;
  }

  public String getDate() {
    return date;
  }

  public void setDate(String date) {
    this.date = date;
  }

  public String getDuree() {
    return duree;
  }

  public void setDuree(String duree) {
    this.duree = duree;
  }

  public String getConstat() {
    return constat;
  }

  public void setConstat(String constat) {
    this.constat = constat;
  }

  public String getCause() {
    return cause;
  }

  public void setCause(String cause) {
    this.cause = cause;
  }

  public String getDelait() {
    return delait;
  }

  public void setDelait(String delait) {
    this.delait = delait;
  }

  public String getConseq() {
    return conseq;
  }

  public void setConseq(String conseq) {
    this.conseq = conseq;
  }

  public String getAction() {
    return action;
  }

  public void setAction(String action) {
    this.action = action;
  }

}
