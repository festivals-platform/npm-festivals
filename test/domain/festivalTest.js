var chai = require('chai');
var should = chai.should();
var festival = require('../../lib/domain/festival');

describe('festival domain test', function () {

  var id = 'id';
  var name = 'name';
  var description = 'description';
  var type = 'type';
  var tags = ['tags'];
  var images = [
    {
      url: 'http://'
    }
  ];
  var createdAt = 'createdAt';
  var updatedAt = 'updatedAt';
  var duration = {
    'duration': 111
  };
  var locations = [
    {
      street: 'street'
    }
  ];

  it('should create domain', function (done) {

    var festivalDomain = new festival.Festival(
      id,
      name,
      description,
      type,
      tags,
      images,
      duration,
      locations,
      createdAt,
      updatedAt
    );

    should.exist(festivalDomain);
    festivalDomain.id.should.be.equal(id);
    festivalDomain.name.should.be.equal(name);
    festivalDomain.description.should.be.equal(description);
    festivalDomain.type.should.be.equal(type);
    festivalDomain.tags.should.be.equal(tags);
    festivalDomain.images.should.be.equal(images);
    festivalDomain.createdAt.should.be.equal(createdAt);
    festivalDomain.updatedAt.should.be.equal(updatedAt);
    festivalDomain.duration.should.be.equal(duration);
    festivalDomain.locations.should.be.equal(locations);

    done();
  });

  it('should create domain by builder', function (done) {

    var festivalDomain = new festival.FestivalBuilder()
      .withId(id)
      .withName(name)
      .withDescription(description)
      .withType(type)
      .withTags(tags)
      .withImages(images)
      .withCreatedAt(createdAt)
      .withUpdatedAt(updatedAt)
      .withDuration(duration)
      .withLocations(locations)
      .build();

    should.exist(festivalDomain);
    festivalDomain.id.should.be.equal(id);
    festivalDomain.name.should.be.equal(name);
    festivalDomain.description.should.be.equal(description);
    festivalDomain.type.should.be.equal(type);
    festivalDomain.tags.should.be.equal(tags);
    festivalDomain.images.should.be.equal(images);
    festivalDomain.createdAt.should.be.equal(createdAt);
    festivalDomain.updatedAt.should.be.equal(updatedAt);
    festivalDomain.duration.should.be.equal(duration);
    festivalDomain.locations.should.be.equal(locations);

    done();
  });

});