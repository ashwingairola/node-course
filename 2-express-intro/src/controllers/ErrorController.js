export class ErrorController {
	static get404(req, res) {
		res.status(404).render('error/404', {
			pageTitle: 'Page Not Found',
			path: ''
		});
	}
}
