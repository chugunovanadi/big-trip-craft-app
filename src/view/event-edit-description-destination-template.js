const createEventEditDescriptionDestinationTemplate = (point) => {
  const {description, pictures} = point.destination;
  const picturesMarkup = pictures.map(({src, descriptionPicture}) => `
  <img class="event__photo" src=${src} alt=${descriptionPicture}>
  `).join('');
  return `
<section class="event__section  event__section--destination">
                    <h3 class="event__section-title  event__section-title--destination">Destination</h3>
                    <p class="event__destination-description">${description}</p>

                    <div class="event__photos-container">
                      <div class="event__photos-tape">
                      ${picturesMarkup}
                      </div>
                    </div>
 </section>
`;};

export {createEventEditDescriptionDestinationTemplate};
