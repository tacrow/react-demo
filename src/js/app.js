'use strict';

class ReactContent extends React.Component {
	render() {
		return (
			<div>
				<Navigation />
				<div className="list">
					<CommentList />
				</div>
			</div>
		);
	}
}

// Navigation
const NAVIGATION_ITEMS = [
	{label: '総合'},
	{label: '粗利'},
	{label: '売上'},
];

class Navigation extends React.Component {
	render() {
		return　(
			<nav className="navigation">
				<NavigationItem />
			</nav>
		);
	}
}

const NavigationItem = (props) => {
	return (
		<ul className="c-nav-list u-cf is-one">
		{NAVIGATION_ITEMS.map((type) =>
			<NavigationLavel
				label = { type.label }
			/>
		)}
		</ul>
	);
}

class NavigationLavel extends React.Component {
	render() {
		return (
			<li className="c-nav-list__item">
				{this.props.label}
			</li>
		);
	}
}

// Content List
class CommentList extends React.Component {
	constructor() {
		super();
		this.state = {
			data: []
		};
	}
	componentDidMount() {
		$.ajax({
			url: '/src/data/content.json',
			type: 'GET',
			dataType: 'json',
			cache: false,
			success: (data) => {
				this.setState({data: data});
			},
			error: (xhr, status, err) => {
				console.error(this.props.url, status, err.toString());
				console.log('error');
			}
		});
	}
	render() {
		return (
			<div className="list">
				<CommentItem data = { this.state.data } />
			</div>
		);
	}
}

class CommentItemImage extends React.Component {
	render() {
		return (
			<div className="c-img-wraper">
				<img src={this.props.image} />
			</div>
		);
	}
}

class CommentItemUserName extends React.Component {
	render() {
		return (
			<p className="u-fs16 u-bold">{this.props.username}</p>
		);
	}
}

class CommentItemText extends React.Component {
	render() {
		return (
			<p  className="u-fs14">{this.props.text}</p>
		);
	}
}

class CommentItem extends React.Component {
	render() {
		var commentItemNodes = this.props.data.map((data) => {
			return(
				<li className='c-list__item u-cf'>
					<CommentItemImage
						image = {data.autorImg}
					/>
					<div className="c-group-info">
						<CommentItemUserName
							username = {data.autor}
						/>
						<CommentItemText 
							text = {data.comment}
						/>
					</div>
				</li>
			);
		});
		return(
			<ul className="c-list">{commentItemNodes}</ul>
		);
	}
}

ReactDOM.render(
	<ReactContent />,
	document.getElementById('react-container')
);