var uuid = require('node-uuid');
var moment = require('moment');

var validator = require('../../validator').validator;
var commonBuilders = require('./commonBuilders');

var EventDomainBuilder = require('../event').EventBuilder;

var festivalsModel = require('festivals-model');
var EventResponseBuilder = festivalsModel.model.eventResponse.EventResponseBuilder;
var EventPlaceResponseBuilder = festivalsModel.model.eventPlaceResponse.EventPlaceResponseBuilder;
var EventCategoryResponseBuilder = festivalsModel.model.eventCategoryResponse.EventCategoryResponseBuilder;
var AuthorResponseBuilder = festivalsModel.model.authorResponse.AuthorResponseBuilder;

var buildEventPlaceResponse = function buildEventPlaceResponse(data) {
  if (!data) {
    return null;
  }

  var name = data.name || null;
  var breadcrumbs = [];//TODO
  var coordinates = commonBuilders.buildCoordinatesResponse(data.coordinates);
  var openingTimes = commonBuilders.buildOpeningTimesResponse(data.openingTimes);

  return new EventPlaceResponseBuilder()
    .withId(data.id)
    .withName(name)
    .withBreadcrumbs(breadcrumbs)
    .withOpeningTimes(openingTimes)
    .withCoordinates(coordinates)
    .build();
};

var buildEventCategoryResponse = function buildEventCategoryResponse(data) {
  if (!data) {
    return null;
  }

  var name = data.name || null;
  var breadcrumbs = [];//TODO
  return new EventCategoryResponseBuilder()
    .withId(data.id)
    .withName(name)
    .withBreadcrumbs(breadcrumbs)
    .build();
};


var buildAuthorResponse = function buildAuthorResponse(authors) {
  if (!authors || authors.length < 1) {
    return [];
  }

  return authors.map(function (author) {
    return new AuthorResponseBuilder()
      .withName(author.name)
      .withOrganization(author.organization)
      .build();
  });
};

var buildEventResponse = function buildEventResponse(data) {
  if (!data) {
    return null;
  }

  var duration = commonBuilders.buildDurationResponse(data.duration);
  var mainImage = commonBuilders.buildMainImageResponse(data.images);
  var eventPlace = buildEventPlaceResponse(data.place);
  var eventCategory = buildEventCategoryResponse(data.category);
  var authors = buildAuthorResponse(data.authors);

  return new EventResponseBuilder()
    .withId(data.id)
    .withName(data.name)
    .withDescription(data.description)
    .withTags(data.tags)
    .withMainImage(mainImage)
    .withDuration(duration)
    .withPlace(eventPlace)
    .withCategory(eventCategory)
    .withAuthors(authors)
    .withCreatedAt(data.createdAt)
    .withUpdatedAt(data.updatedAt)
    .build();
};

var buildEventDomain = function buildEventDomain(festivalId, params, newObject) {

  var id;
  var createdAt;
  var now = moment().toISOString();
  var validate = validator(newObject);

  var name = validate.getString(params.name, 'name');
  var description = validate.getString(params.description, 'description');
  var tags = validate.getArrayOfString(params.tags, 'tags', []);
  var metadata = validate.getArrayOfString(params.metadata, 'metadata', []);
  var images = commonBuilders.buildImagesDomain(validate, params);
  var place = validate.getString(params.place, 'place');
  var category = validate.getString(params.category, 'category');
  var duration = commonBuilders.buildDurationDomain(validate, params.duration, 'duration');
  var authors = buildAuthorResponse(params.authors);

  if (newObject) {
    id = uuid.v4();
    createdAt = now;
  }

  var event = new EventDomainBuilder()
    .withId(id)
    .withName(name)
    .withDescription(description)
    .withTags(tags)
    .withAuthors(authors)
    .withImages(images)
    .withCreatedAt(createdAt)
    .withUpdatedAt(now)
    .withDuration(duration)
    .withPlace(place)
    .withCategory(category)
    .withFestival(festivalId)
    .withMetadata(metadata)
    .build();

  commonBuilders.removeUndefined(event);
  return event;
};

module.exports = {
  buildEventResponse: buildEventResponse,
  buildEventDomain: buildEventDomain
};