import Subscriber from "../database/model/subscribers.model";
import catchAsync from '../utils/catchAsync';


exports.subscribeToBlog = catchAsync(async (req, res, next) => {

	let subscriber = await Subscriber.findOne({email: req.body.email});

		if (!subscriber) {
			const newSubscriber = await Subscriber.create(req.body);
			res.status(201).json({
				status: 'success',
		
				data: {
					subscriber: newSubscriber
				}
		})
	} else {
		return res.status(400).json({
			status: 'failed!',
			message: "Sorry , you are already subscribed to Salim's blog site!!",
		});
	}

    const newSubscriber = await Subscriber.create(req.body);
    res.status(201).json({
        status: 'success',

        data: {
            subscriber: newSubscriber
        }
    })
});

exports.getAllSubscribers = async (req, res) => {
	const subscribers = await Subscriber.find();
	res.status(200).json({
		results:subscribers.length,
		success: true, 
		data: subscribers, 
	});
};

exports.unsubscribeToBlog = async (req, res, next) => {


	let subscriber = await Subscriber.findOne({
		email: req.body.email,
	});
	if (subscriber) {
		await Subscriber.findByIdAndDelete(subscriber.id);
		res.status(200).json({
			success: true,
			message: "Successfully unsubscribed from our salim's blogs",
		});
	} else {
	return res
		.status(404)
		.json({ success: false, message: "It seems like you are not a subscriber in first place!" });
};
(next);
}