import Listing from '../models/listing.model.js';
import { errorHandler } from '../utils/error.js';

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
    return next(errorHandler(401, 'Listing not found'));
  }

  if (userId !== listing.userRef) {
    return next(errorHandler(401), 'You can only delete you own listings!');
  }

  try {
    await Listing.findByIdAndDelete(paramsId);
    return res.status(200).json({ message: 'Listing deleted successfully' });
  } catch (err) {
    next(err);
  }
}
