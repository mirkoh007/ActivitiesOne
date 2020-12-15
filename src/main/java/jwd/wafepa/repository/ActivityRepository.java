package jwd.wafepa.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import jwd.wafepa.model.Activity;

@Repository
public interface ActivityRepository extends PagingAndSortingRepository<Activity, Long> {

	Page<Activity> findByNameContaining(String name, Pageable pageable);

	List<Activity> findByName(String name);

	List<Activity> findByNameLike(String name);

}
