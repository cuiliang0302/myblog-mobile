// 配置颜色

function setColor() {
  const tagColor = (tagId) => {
    let color = ''
    switch (tagId % 10) {
      case 0:
        color = "#c0392b";
        break;
      case 1:
        color = "#1abc9c";
        break;
      case 2:
        color = "#16a085";
        break;
      case 3:
        color = "#2ecc71";
        break;
      case 4:
        color = "#27ae60";
        break;
      case 5:
        color = "#9b59b6";
        break;
      case 6:
        color = "#8e44ad";
        break;
      case 7:
        color = "#f1c40f";
        break;
      case 8:
        color = "#f39c12";
        break;
      case 9:
        color = "#d35400";
        break;
      default:
        color = "#409EFF";
    }
    return color
  }
  return {
    tagColor
  }
}

export default setColor
