export default function Footer() {
  return (
    <footer className="footer-bg bg-black bg-cover bg-center text-white">
      <div className="mx-auto max-w-7xl px-6 pb-10 pt-16 lg:pt-20">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
          <div>
            <img
              src="/assets/Logo.png"
              alt="Night Club - Have a good time"
              width={184}
              height={45}
              className="mb-10"
            />

            <h2 className="mb-2 text-xl font-semibold uppercase text-pink-500">
              Location
            </h2>

            <address className="mb-8 not-italic">
              Kompagnistræde 278
              <br />
              1265 København K
            </address>

            <h2 className="mb-2 text-xl font-semibold uppercase text-pink-500">
              Opening Hours
            </h2>

            <p>WED - THU: 10:30 PM TO 3 AM</p>
            <p>SAT - SUN: 11 PM TO 5 AM</p>
          </div>

          <section>
            <h2 className="mb-10 text-xl font-semibold uppercase text-pink-500">
              News
            </h2>

            <ul className="space-y-10">
              <li className="flex items-start gap-5">
                <img
                  src="/assets/content-img/recent_post1.jpg"
                  alt=""
                  width={100}
                  height={91}
                  loading="lazy"
                  className="size-20 shrink-0 object-cover xl:size-26"
                />

                <div>
                  <p>
                    Get ready for an epic night with DJ Anya at The Blue Room.
                    Doors open at 9 PM!
                  </p>

                  <time
                    dateTime="2026-04-17"
                    className="mt-3 block text-sm text-pink-500"
                  >
                    April 17, 2026
                  </time>
                </div>
              </li>

              <li className="flex items-start gap-5">
                <img
                  src="/assets/content-img/recent_post2.jpg"
                  alt=""
                  width={100}
                  height={91}
                  loading="lazy"
                  className="size-20 shrink-0 object-cover xl:size-26"
                />

                <div>
                  <p>
                    Join us for Retro Night with DJ Elroy at The Velvet Room.
                    Doors open at 8 PM!
                  </p>

                  <time
                    dateTime="2026-04-17"
                    className="mt-3 block text-sm text-pink-500"
                  >
                    April 17, 2026
                  </time>
                </div>
              </li>
            </ul>
          </section>

          <section>
            <h2 className="mb-10 text-xl font-semibold uppercase text-pink-500">
              Recent Posts
            </h2>

            <ul className="space-y-10">
              <li className="flex items-start gap-4">
                <img
                  src="/assets/icon/x.png"
                  alt="X"
                  width={20}
                  height={20}
                  className="mt-1 size-5 shrink-0 object-contain"
                />

                <div>
                  <p>
                    It is a long established fact that a reader will be
                    distracted by the readable...
                  </p>

                  <p className="mt-3 text-sm text-pink-500">5 hours ago</p>
                </div>
              </li>

              <li className="flex items-start gap-4">
                <img
                  src="/assets/icon/x.png"
                  alt="X"
                  width={20}
                  height={20}
                  className="mt-1 size-5 shrink-0 object-contain"
                />

                <div>
                  <p>
                    Experience the electrifying beats of DJ Kai at Club Nova.
                    Doors open at 10 PM, and the rhythm never stops. Get ready
                    for a night of unforgettable music!
                  </p>

                  <p className="mt-3 text-sm text-pink-500">5 hours ago</p>
                </div>
              </li>
            </ul>
          </section>
        </div>

        <div className="mt-16 grid items-end gap-6 text-center lg:mt-28 lg:grid-cols-3">
          <p className="text-zinc-400 lg:text-left">
            Night Club - All Rights Reserved
          </p>

          <div>
            <p className="mb-4">Stay Connected With Us</p>

            <div className="flex justify-center gap-4">
              <img
                src="/assets/icon/facebook.png"
                alt="Facebook"
                width={44}
                height={44}
                className="size-11 object-contain"
              />

              <img
                src="/assets/icon/snap.png"
                alt="Snapchat"
                width={44}
                height={44}
                className="size-11 object-contain"
              />

              <img
                src="/assets/icon/insta.png"
                alt="Instagram"
                width={44}
                height={44}
                className="size-11 object-contain"
              />
            </div>
          </div>

          <p className="text-zinc-400 lg:text-right">Copyright © NightClub</p>
        </div>
      </div>
    </footer>
  );
}
