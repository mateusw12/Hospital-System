package com.api.hospitalsystem.repository.item;

import com.api.hospitalsystem.model.item.ItemModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ItemRepository extends JpaRepository<ItemModel, Long> {
}
