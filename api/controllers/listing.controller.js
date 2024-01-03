import Listing from '../models/listing.model.js';
import { errorHandler } from '../utils/error.js';

export async function getSingleListing(req, res, next) {
  const { listingId } = req.params;
  try {
    const listing = await Listing.findById(listingId);
    return res.status(201).json(listing);
  } catch (err) {
    next(err);
  }
}

export async function createListing(req, res, next) {
  try {
    const listing = await Listing.create(req.body);
    return res.status(201).json(listing);
  } catch (err) {
    next(err);
  }
}

export async function deleteListing(req, res, next) {
  const userId = req.user.id;
  const paramsId = req.params.id;
  const listing = await Listing.findById(paramsId);

  if (!listing) {
    return next(errorHandler(404, 'Listing not found'));
  }

  if (userId !== listing.userRef) {
    return next(errorHandler(401, 'You can only delete you own listings!'));
  }

  try {
    await Listing.findByIdAndDelete(paramsId);
    return res.status(200).json({ message: 'Listing deleted successfully' });
  } catch (err) {
    next(err);
  }
}

export async function updateListing(req, res, next) {
  const userId = req.user.id;
  const paramsId = req.params.id;
  const listing = await Listing.findById(paramsId);

  if (!listing) {
    return next(errorHandler(404, 'Listing not found'));
  }

  if (userId !== listing.userRef) {
    return next(errorHandler(401, 'You can only update you own listings!'));
  }

  try {
    const updatedListing = await Listing.findByIdAndUpdate(paramsId, req.body, {
      new: true,
    });
    res.status(200).json(updatedListing);
  } catch (err) {
    next(err);
  }
}

export async function getListings(req, res, next) {
  let {
    limit = 9,
    startIndex = 0,
    searchTerm = '',
    sort = 'createAt',
    order = 'desc',
    offer,
    furnished,
    parking,
    type,
  } = req.query;

  if (offer === undefined || offer === 'false') {
    offer = { $in: [false, true] };
  }

  if (furnished === undefined || furnished === 'false') {
    furnished = { $in: [false, true] };
  }

  if (parking === undefined || parking === 'false') {
    parking = { $in: [false, true] };
  }

  if (type === undefined || type === 'all') {
    type = { $in: ['sale', 'rent'] };
  }

  try {
    const listings = await Listing.find({
      title: { $regex: searchTerm, $options: 'i' },
      offer,
      furnished,
      parking,
      type,
    })
      .sort({ [sort]: order })
      .limit(limit)
      .skip(startIndex);

    return res.status(201).json(listings);
  } catch (err) {
    next(err);
  }
}
