export function cursor() {
  const getElementCoordinates = (event, element) => {
    let clientX = event.clientX;
    let clientY = event.clientY;
    let boundingRect = element.getBoundingClientRect()
    return {
      x: clientX - boundingRect.x,
      y: clientY - boundingRect.y,
    };
  }
  return{
    getElementCoordinates
  }
}
