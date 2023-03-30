package com.api.hospitalsystem.service.item;

import com.api.hospitalsystem.dto.item.ItemDTO;
import com.api.hospitalsystem.mapper.item.ItemMapper;
import com.api.hospitalsystem.repository.item.ItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityNotFoundException;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ItemService {

    @Autowired
    private ItemRepository itemRepository;

    @Autowired
    private ItemMapper itemMapper;

    @Transactional
    public List<ItemDTO> findAll() {
        return itemRepository.findAll()
                .stream()
                .map(itemMapper::toDTO)
                .collect(Collectors.toList());
    }

    @Transactional
    public ItemDTO findById(Long id) {
        return itemRepository.findById(id).map(itemMapper::toDTO)
                .orElseThrow(() -> new EntityNotFoundException("Item not found" + id));
    }

    @Transactional
    public ItemDTO create(ItemDTO itemDTO) {
        return itemMapper.toDTO(itemRepository.save(itemMapper.toEntity(itemDTO)));
    }

    @Transactional
    public ItemDTO update(Long id, ItemDTO itemDTO) {
        return itemRepository.findById(id)
                .map(recordFound -> {
                    recordFound.setVisible(itemDTO.visible());
                    recordFound.setItemFather(itemDTO.itemFather());
                    recordFound.setPath(itemDTO.path());
                    recordFound.setOnlyPath(itemDTO.onlyPath());
                    recordFound.setDescriptionFather(itemDTO.descriptionFather());
                    recordFound.setDescription(itemDTO.description());
                    return itemMapper.toDTO(itemRepository.save(recordFound));
                }).orElseThrow(() -> new EntityNotFoundException("Item not found" + id));
    }

    @Transactional
    public void delete(Long id) {
        itemRepository.delete(itemRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Item not found" + id)));
    }

}
