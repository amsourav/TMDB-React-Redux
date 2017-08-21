import React from "react";
import { Link } from "react-router-dom";
import FontAwesome from "react-fontawesome";
import { connect } from "react-redux";
import "./Header.less";
import logo from "./logo.png";
import { SEARCH } from "../../constants/actionTypes";

class Header extends React.Component {
	constructor(props) {
		super(props);
		this.inputHandler = this.inputHandler.bind(this);
		this.injectSearchForm = this.injectSearchForm.bind(this);
		this.hideSearchForm = this.hideSearchForm.bind(this);
		this.state = {
			search: props.search.payload.term ? true : false
		};
	}
	hideSearchForm() {
		this.state = {
			search: false
		};
		this.props.searchMovie({
			type: SEARCH,
			term: "",
			target: []
		});
	}
	injectSearchForm() {
		this.setState({
			search: true
		});
	}
	inputHandler(e) {
		this.props.searchMovie({
			type: SEARCH,
			term: e.target.value,
			target: this.props.searchableMovies
		});
	}
	render() {
		return (
			<header className="Header">
				<div className="Container">
					<div className="Header__wrap">
						<div className="Header__left">
							<Link to="/">
								<img
									src={logo}
									alt="BMDB"
									className="Header__logo"
								/>
							</Link>
						</div>
						{!this.state.search
							? <div className="Header__right">
									<Link className="Header__item" to="/">
										<span className="u-text">POPULAR</span>
									</Link>
									<Link className="Header__item" to="/favorite">
										<span className="u-text">FAVORITE</span>
									</Link>
									<div
										className="Header__item"
										onClick={this.injectSearchForm}
									>
										<FontAwesome name="search" />
									</div>
								</div>
							: <div className="Header__right">
									<div className="Header__item">
										<input
											placeholder="Search..."
											value={this.props.search.payload.term}
											style={{ marginRight: 15 }}
											onChange={this.inputHandler}
										/>
										<span onClick={this.hideSearchForm}>
											<FontAwesome name="times" />
										</span>
									</div>
								</div>}
					</div>
				</div>
			</header>
		);
	}
}

function mapStateToProps(state) {
	return {
		searchableMovies: state.fetchReducer.moviesData,
		search: state.searchReducer
	};
}

function mapDispatchToProps(dispatch) {
	return {
		searchMovie({ type, term, target }) {
			dispatch({
				type,
				payload: {
					term,
					target
				}
			});
		}
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
