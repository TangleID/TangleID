const getValues = (refs) => {
	return Object.keys(refs).reduce((acc, cur) => {
		acc[cur] = refs[cur].value
		return acc
	}, {})
}

const clear = (refs) => {
	Object.keys(refs).forEach(key => refs[key].value = '')
}

const Form = (props) => {
	const { handleSubmit } = props
	const refs = {}
	return (
		<form onSubmit={(e) => {
			e.preventDefault()
			const values = getValues(refs)
			handleSubmit(values)
			clear(refs)
		}}>
			<div>
				<label htmlFor="firstName"> first name</label>
				<input
					type="text"
					name="firstName"
					placeholder="first name"
					ref={(input) => { refs.firstName = input }}
				/>
			</div>

			<div>
				<label htmlFor="lastName">last name</label>
				<input
					type="text"
					name="lastName"
					placeholder="last name"
					ref={(input) => { refs.lastName = input }}
				/>
			</div>

			<div>
				<label htmlFor="cosignerp">cosignerp</label>
				<input
					type="text"
					name="cosignerp"
					placeholder="cosignerp(optional)"
					ref={(input) => { refs.cosignerp = input }}
				/>
			</div>

			<div>
				<label htmlFor="cosigners">cosigners</label>
				<input
					type="text"
					name="cosigners"
					placeholder="cosigners(optional)"
					ref={(input) => { refs.cosigners = input }}
				/>
			</div>
			<div>
				<label htmlFor="profilePicture">Profile picture </label>
				<input
					type="text"
					name="profilePicture"
					placeholder="profile picture"
					ref={(input) => { refs.profilePicture = input }}
				/>
			</div>
			<div>
				<button> send </button>
			</div>
		</form>
	)
}

export default Form
