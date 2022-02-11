<script type="ts">
	import { signInWithPopup, getAuth, GoogleAuthProvider, User } from 'firebase/auth';
	import { user } from '../stores/AuthStore';

	let loggedIn = false;

	const loginWithGoogle = async () => {
		try {
			const provider = new GoogleAuthProvider();
			await signInWithPopup(getAuth(), provider);
		} catch (e) {
			console.log(e);
		}
	};
	// will be fired every time auth state changes
	getAuth().onAuthStateChanged(async (fireUser: User) => {
		if (fireUser) {
			user.set(fireUser);
			loggedIn = true;
		} else {
			loggedIn = false;
		}
	});
</script>

<div>
	<slot {loggedIn} {loginWithGoogle} />
</div>
