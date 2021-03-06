import React from "react";
import FontAwesome from "react-fontawesome";
import "./MovieCard.less";
import Overlay from "../Overlay";
import { releaseDateFormatted } from "../../utils/dateHelper";
import { connect } from "react-redux";
import { LIKE_MOVIE, DISLIKE_MOVIE } from "../../constants/actionTypes";
import _ from "lodash";

class MovieCard extends React.Component {
	constructor(props) {
		super(props);
		this.getImageURL = this.getImageURL.bind(this);
		this.handleLike = this.handleLike.bind(this);
	}

	getImageURL(imagePath) {
		return `https://image.tmdb.org/t/p/w300${imagePath}`;
	}

	handleLike() {
		if (_.includes(this.props.likedMovies, this.props.data.id)) {
			this.props.likeMovie({
				type: DISLIKE_MOVIE,
				payload: {
					id: this.props.data.id
				}
			});
		} else {
			this.props.likeMovie({
				type: LIKE_MOVIE,
				payload: {
					id: this.props.data.id
				}
			});
		}
	}

	render() {
		let heartIcon = _.includes(this.props.likedMovies, this.props.data.id)
			? <FontAwesome style={{ color: "red" }} name="heart" />
			: <FontAwesome name="heart-o" />;
		return (
			<div key={this.props.data.id} className="MovieCard">
				<div className="MovieCard__Poster">
					<img
						src={this.getImageURL(this.props.data.poster_path)}
						alt={this.props.data.title}
					/>
				</div>
				<Overlay />
				<div className="MovieCard__InnerContainer">
					<div className="MovieCard__releaseDate p-absolute u-text p-topLeft">
						{releaseDateFormatted(this.props.data.release_date)}
					</div>
					<div className="MovieCard__userInteractionContainer p-absolute p-topRight">
						<div
							className="Icon Icon__noPadding u-text"
							onClick={this.handleLike}
						>
							{heartIcon}
						</div>
						<div className="Icon Icon__noPadding u-text">
							<FontAwesome name="comment" />
						</div>
						<div className="Icon Icon__noPadding Icon__unsetWidth u-text u-cursor-pointer">
							<FontAwesome name="star-o" />
							<span className="favortites u-padding-6p-left">
								{this.props.data.vote_count}
							</span>
						</div>
					</div>
					<div className="MovieCard__movieDetails p-absolute p-bottomLeft">
						<div className="MovieCard__lanugage u-text" />
						<div className="MovieCard__name u-text">
							{this.props.data.title}
						</div>
						<div className="MovieCard__share">
							<div className="Icon Icon__Circular u-text u-color-fb u-cursor-pointer">
								<FontAwesome name="facebook" />
							</div>
							<div className="Icon Icon__Circular u-text u-color-twitter u-cursor-pointer">
								<FontAwesome name="twitter" />
							</div>
							<div className="Icon Icon__Circular u-text u-color-whatsapp u-cursor-pointer">
								<FontAwesome name="whatsapp" />
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		likedMovies: state.likeReducer.favMovies
	};
}

function mapDispatchToProps(dispatch) {
	return {
		likeMovie({ type, payload }) {
			dispatch({
				type,
				payload
			});
		}
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(MovieCard);
