package jwd.wafepa;

import javax.annotation.PostConstruct;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import jwd.wafepa.model.Activity;

import jwd.wafepa.service.ActivityService;


@Component
public class TestData {


	@Autowired
	private ActivityService activityService;
//
	@PostConstruct
	public void init(){
//	      
//	       
//	    
		activityService.save(new Activity("Swimming"));
	   	activityService.save(new Activity("Running"));
	   	activityService.save(new Activity("Diving"));
	   	activityService.save(new Activity("Skiing"));
	   	activityService.save(new Activity("Jumping"));
	   	activityService.save(new Activity("Biking"));
	   	activityService.save(new Activity("Snowboarding"));
	   	activityService.save(new Activity("Rolling"));
	}
	
	
}
