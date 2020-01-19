package jwd.wafepa.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import jwd.wafepa.model.Activity;

@Repository
public interface ActivityRepository extends PagingAndSortingRepository<Activity, Long> {

//	@Query("select a from Activity a where a.name = :name")
//	List<Activity> findByName(@Param("name") String name);
	
	Page<Activity> findByNameContaining(String name, Pageable pageable);

	List<Activity> findByName(String name);
	
	List<Activity> findByNameLike(String name);
	
}
