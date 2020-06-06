
package com.wildlife.app.wildlife.app.models.constants.tables;

import com.wildlife.app.wildlife.app.models.constants.DBColumnConstants;
import lombok.Data;
import org.springframework.data.rest.core.annotation.RestResource;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import java.util.List;

@Data
@Entity(name = DBColumnConstants.TBL_MENU_ITEM)
public class MenuItem implements DBColumnConstants {
    @Id
    @Column(name = COL_TBL_MENU_ITEM_ID)
    private String menuItemId;
    @Column(name = COL_TBL_MENU_ITEM_MENU_TEXT, nullable = false)
    private String menuText;
    @Column(name = COL_TBL_MENU_ITEM_LINK, nullable = false)
    private String link;
    @Column(name = COL_TBL_MENU_ITEM_ALLOWED_FOR, nullable = false)
    private String allowedFor;

    @RestResource(exported = false)
    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "parent_menu_id", referencedColumnName = COL_TBL_MENU_ITEM_ID)
    private List<MenuItem> submenus;

}
