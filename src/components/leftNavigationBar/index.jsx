import React, { useEffect, useState } from "react";
import { Menu } from "antd";
import { StarOutlined, StarFilled } from "@ant-design/icons";
import MENUS from "./menus";
import "./index.css";
import useLocalStorage from "./useLocalStorage";

const LeftNavigationBar = () => {
  const [favorites, setFavorites] = useState([]);
  const [localFavorites, setLocalFavorites] = useLocalStorage("favorites", []);

  useEffect(() => {
    const tempFavorites = [];
    const tempMenus = [];
    MENUS.forEach((v) => {
      const { key } = v;
      if (localFavorites.includes(key)) tempFavorites.push(v);
      else tempMenus.push(v);
    });
    setFavorites(tempFavorites);
  }, [localFavorites]);

  const onFavoriteAdd = (e) => {
    const key = e.currentTarget.dataset.key;
    return setLocalFavorites([...localFavorites, key]);
  };

  const onFavoriteCancle = (e) => {
    const localFavoritesCopy = localFavorites.slice();
    const key = e.currentTarget.dataset.key;
    const deleteIdx = localFavoritesCopy.indexOf(key);
    if (deleteIdx !== -1) {
      localFavoritesCopy.splice(deleteIdx, 1);
      setLocalFavorites(localFavoritesCopy);
    }
  };

  return (
    <div className="left-navigation-bar">
      {favorites.length && (
        <Menu defaultSelectedKeys={[MENUS[0].key]} mode="inline" theme="dark">
          {favorites.map(({ key, label, icon }) => (
            <Menu.Item key={key} icon={icon} className="menus">
              {label}
              <StarFilled data-key={key} onClick={onFavoriteCancle} />
            </Menu.Item>
          ))}
        </Menu>
      )}
      <Menu defaultSelectedKeys={[MENUS[0].key]} mode="inline" theme="dark">
        {MENUS.map(({ key, label, icon }) => (
          <Menu.Item key={key} icon={icon} className="menus">
            {label}
            {!localFavorites.includes(key) && (
              <StarOutlined data-key={key} onClick={onFavoriteAdd} />
            )}
          </Menu.Item>
        ))}
      </Menu>
    </div>
  );
};

export default LeftNavigationBar;
