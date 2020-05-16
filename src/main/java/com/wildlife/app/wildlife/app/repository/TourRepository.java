package com.wildlife.app.wildlife.app.repository;

import com.wildlife.app.wildlife.app.models.Tour;
import com.wildlife.app.wildlife.app.models.projections.TourProjection;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import java.util.Date;
import java.util.Optional;

@RepositoryRestResource(
        collectionResourceRel = "tours",
        path = "tours",
        excerptProjection = TourProjection.class
)
public interface TourRepository extends JpaRepository<Tour, Integer> {
    @Query("select t from Tour t where (t.startDate between :startDate and :endDate) " +
            "or (t.endDate between :startDate and :endDate)")
    Optional<Tour> findOverlappingDates(@Param("startDate") Date startDate, @Param("endDate") Date endDate);

    @Query(value = "select * from tbl_tour where (tour_start_date between \n" +
            "date('?1')\n" +
            "and \n" +
            "date('?2'))\n" +
            "or \n" +
            "(tour_end_date between \n" +
            "date('?1')\n" +
            "and \n" +
            "date('?2'));", nativeQuery = true)
    Optional<Tour> findOverlappingDatesNative(String startDate, String endDate);
}
