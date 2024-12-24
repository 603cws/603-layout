import CryptoJS from "crypto-js";

/**
 * Extracts, decrypts, and removes the `userId` from the URL.
 * @returns {string|null} - The decrypted `userId`, or null if something goes wrong.
 */
export const handleUserId = () => {
    try {
        const queryParams = new URLSearchParams(window.location.search);
        const encryptedUserId = queryParams.get("userId");

        if (!encryptedUserId) {
            console.error("No userId in query parameters.");
            return null;
        }

        const secretKey = process.env.REACT_APP_SECRET_KEY;
        if (!secretKey) {
            throw new Error("Secret key is undefined. Check your .env file.");
        }

        // Decrypt the userId
        const decryptedUserId = CryptoJS.AES.decrypt(encryptedUserId, secretKey).toString(CryptoJS.enc.Utf8);
        console.log("Decrypted User ID:", decryptedUserId);

        // Clean up the URL
        const url = new URL(window.location.href);
        url.searchParams.delete("userId");
        window.history.replaceState(null, "", url.toString());

        return decryptedUserId;
    } catch (error) {
        console.error("Error processing userId:", error);
        return null;
    }
};
