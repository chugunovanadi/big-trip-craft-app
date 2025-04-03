const createEventEditOffersTemplate = (offersById, offersByType) => {
  const offersMarkup = offersByType.offers.map(({ titleOffer, priceOffer, id }) => {
    const isChecked = offersById.some((offer) => offer.id === id) ? 'checked' : '';
    return `
      <div class="event__offer-selector">
        <input class="event__offer-checkbox visually-hidden"
               id="event-offer-${id}"
               type="checkbox"
               name="event-offer-${id}"
               ${isChecked}>
        <label class="event__offer-label" for="event-offer-${id}">
          <span class="event__offer-title">${titleOffer}</span>
          &plus;&euro;&nbsp;
          <span class="event__offer-price">${priceOffer}</span>
        </label>
      </div>
    `;
  }).join('');

  return `          <section class="event__section  event__section--offers">
                    <h3 class="event__section-title  event__section-title--offers">Offers</h3>
                    <div class="event__available-offers">
                      ${offersMarkup}
                    </div>
                </section>
`;};

export {createEventEditOffersTemplate};
