// import { useEffect, useState } from "react";

// const Posts = () => {
//   const [posts, setPosts] = useState([]);

//   useEffect(() => {
//     (async () => {
//       const response = await fetch("127.0.0.1:5000/api/posts/", {
//         method: "GET",
//       });
//       if (response.ok) {
//         const data = await response.json();
//         setPosts(data);
//       }
//     })();
//   }, []);

//   console.log("HERE", posts);

//   return (
//     <div>
//       {posts?.map((post, idx) => {
//         <li key={idx}>{post}</li>;
//       })}
//     </div>
//   );
// };

// export default Posts;
