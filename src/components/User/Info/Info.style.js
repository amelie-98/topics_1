import styled from 'styled-components';

export default styled.div`
  .container {
    display: flex;
    justify-content: center;

    .total {
      margin-top: 100px;
      width: 1200px;
      display: flex;

      .left {
        flex: 3.3;

        .header {
          margin: 15px;
          display: flex;
          font-size: 15px;

          img {
            width: 64px;
            height: 64px;
          }

          .info {
            height: 64px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            margin-left: 20px;

            .info__name {
              color: #009090;
              font-size: 18px;
              display: inline-block;
              margin: 0 8px 0 0;
              transition: color 0.15s cubic-bezier(0.2, 0.2, 0.2, 1);
              width: 100%;
              font-weight: bold;
            }

            .info__coin {
              color: #fff;
              margin-top: 4px;
              margin-bottom: 4px;
              background: #999;
              display: inline-flex;
              align-items: center;
              justify-content: center;
              border-radius: 3px;
              padding: 0 8px;
              font-size: 11px;
              font-weight: 700;
              height: 20px;
              box-sizing: border-box;
              text-decoration: none;
              white-space: nowrap;
              text-transform: uppercase;
            }
          }
        }
      }

      .right {
        flex: 6.7;

        .header {
          margin: 15px 15px 15px 0;
          display: flex;
          font-size: 15px;

          img {
            width: 50px;
            height: 50px;
          }

          .info {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            margin-left: 20px;

            .title {
              font-weight: 500;
              margin-bottom: 16px;
              font-size: 45px;
              line-height: 48px;
              margin: 0 0 24px;
            }

            .content {
              max-width: 500px;
              font-size: 14px;
              line-height: 20px;
              font-weight: 400;
              margin: 0 0 12px 5px;
            }
          }
        }

        h4 {
          margin: 6px 0;
          font-size: 18px;
          font-weight: 600;
        }

        .item {
          cursor: pointer;
          max-width: 550px;
          padding: 15px 0;
          display: flex;
          align-items: center;
          justify-content: space-between;
          border: none;
          border-bottom: 1px solid #e5e5e5;
          border-top: 1px solid #e5e5e5;
          transition: background-color 0.15s cubic-bezier(0.2, 0.2, 0.2, 1);
          width: 100%;

          .left {
            .top {
              font-size: 22px;
              line-height: 22px;
              font-weight: 400;
              color: #333;
              display: block;
            }

            .down {
              display: inline-block;
              margin-top: 12px;
              font-size: 14px;
              font-weight: 400;
              color: #009090;
            }
          }

          svg {
            font-size: 20px;
            align-self: center;
            color: #009090;
            margin-left: 4px;
          }
        }

        .user-info {
          margin-top: 100px;
        }
      }
    }
  }
`;
