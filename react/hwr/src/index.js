import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, useRouterHistory  } from 'react-router';
import { createHistory } from 'history';

import routes from './routes';

ReactDOM.render(
	
	<Router 
		onUpdate={() => window.scrollTo(0, 0)}>

		{routes}

	</Router>,
	document.getElementById('app')
	);

